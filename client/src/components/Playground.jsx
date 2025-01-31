import { useDrop } from 'react-dnd';
import { Block } from './Block';

export const Playground = ({ onDrop, blocks }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'BLOCK',
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                onDrop(item, null);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    return (
        <div
            ref={drop}
            className={`relative transition-all duration-200
        bg-white border-2 p-8 min-h-72
        ${isOver && canDrop ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-300'}
        ${isOver && !canDrop ? 'border-red-500 bg-red-50' : ''}
      `}
        >
            <h2 className="text-xl font-bold mb-4 text-gray-800">Playground</h2>
            <div className="flex flex-wrap gap-4">
                {blocks.map((block) => (
                    <Block key={block.id} {...block} />
                ))}
            </div>
            {blocks.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Drag blocks here to build your encryption expression
                </div>
            )}
        </div>
    );
};