import { Block } from "./Block";

export const Toolbar = ({ blocks }) => {
    return (
        <div className="bg-gray-100 p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Available Blocks</h2>
            <div className="flex flex-wrap gap-4">
                {blocks.map((block) => (
                    <div key={block.id} className="transform transition-transform duration-200 hover:-translate-y-1">
                        <Block {...block} />
                    </div>
                ))}
            </div>
        </div>
    );
};