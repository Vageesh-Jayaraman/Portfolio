export default function HelperBox({ name, color }) {
    return (
        <div className={`border px-1.5 py-0.5 text-xs font-medium font-mono ${color}`}>
            {name}
        </div>
    );
}
