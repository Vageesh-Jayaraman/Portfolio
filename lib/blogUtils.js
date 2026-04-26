import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

const blogsDir = path.join(process.cwd(), 'public/blogs');


export function getCategories() {
  try {
    const categories = fs.readdirSync(blogsDir).filter((file) => {
      const fullPath = path.join(blogsDir, file);
      return fs.statSync(fullPath).isDirectory();
    });
    return categories.sort();
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}

export function getBlogsInCategory(category) {
  try {
    const categoryPath = path.join(blogsDir, category);
    
    if (!fs.existsSync(categoryPath)) {
      return [];
    }

    const blogs = fs.readdirSync(categoryPath)
      .filter((file) => {
        const fullPath = path.join(categoryPath, file);
        return fs.statSync(fullPath).isDirectory();
      })
      .map((slug) => {
        const readmePath = path.join(categoryPath, slug, 'readme.md');
        if (!fs.existsSync(readmePath)) {
          return null;
        }

        const fileContent = fs.readFileSync(readmePath, 'utf-8');
        const { data: frontmatter } = matter(fileContent);

        return {
          slug,
          category,
          title: frontmatter.title || slug,
          description: frontmatter.description || '',
          date: frontmatter.date || '',
          readingTime: frontmatter.readingTime || '5 min',
          tags: frontmatter.tags || [],
        };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return blogs;
  } catch (error) {
    console.error(`Error reading blogs in category ${category}:`, error);
    return [];
  }
}


export async function getBlogPost(category, slug) {
  try {
    const readmePath = path.join(blogsDir, category, slug, 'readme.md');
    
    if (!fs.existsSync(readmePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(readmePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content);

    const htmlContent = processedContent.toString();

    return {
      slug,
      category,
      title: frontmatter.title || slug,
      description: frontmatter.description || '',
      date: frontmatter.date || '',
      readingTime: frontmatter.readingTime || '5 min',
      tags: frontmatter.tags || [],
      content: htmlContent,
    };
  } catch (error) {
    console.error(`Error reading blog post ${category}/${slug}:`, error);
    return null;
  }
}


export function getAllBlogs() {
  const categories = getCategories();
  const allBlogs = [];

  categories.forEach((category) => {
    const blogsInCategory = getBlogsInCategory(category);
    allBlogs.push(...blogsInCategory);
  });

  return allBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}
