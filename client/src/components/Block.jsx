import { useDrag, useDrop } from 'react-dnd';
import { AlertCircle } from 'lucide-react';

export const BLOCK_TYPES = {
    FUNCTION: 'function',
    OPERATOR: 'operator',
    CONSTANT: 'constant',
    PLAINTEXT: 'plaintext'
};

export const Block = ({ id, type, value, children, onDrop: handleDrop, isValid = true }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'BLOCK',
        item: { id, type, value },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'BLOCK',
        drop: (item, monitor) => {
            if (!monitor.didDrop() && handleDrop) {  // Check if handleDrop exists
                handleDrop(item, id);
            }
        },
        canDrop: (item, monitor) => {
            // Prevent dropping on itself
            if (item.id === id) {
                return false;
            }

            // Function block validation
            if (type === BLOCK_TYPES.FUNCTION) {
                // Don't allow drop if already has children
                if (children) {
                    return false;
                }
            }

            // Constants and plaintext can't accept drops
            if (type === BLOCK_TYPES.CONSTANT || type === BLOCK_TYPES.PLAINTEXT) {
                return false;
            }

            return true;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    const getDropZoneStyle = () => {
        if (isOver && !canDrop) {
            return 'border-red-500 bg-red-50';
        }
        if (isOver && canDrop) {
            return 'border-green-500 bg-green-50';
        }
        return 'border-dashed border-gray-400';
    };

    const renderBlock = () => {
        switch (type) {
            case BLOCK_TYPES.FUNCTION:
                return (
                    <div
                        className={`relative group transition-all duration-200 
              ${isDragging ? 'opacity-50 scale-105' : ''} 
              ${!isValid ? 'border-red-500' : ''}
              bg-purple-200 p-4 rounded-lg min-w-32 min-h-16 hover:shadow-lg`}
                    >
                        <div className="font-bold text-purple-800 flex items-center gap-2">
                            {value}
                            {!isValid && (
                                <AlertCircle className="text-red-500 w-4 h-4" />
                            )}
                        </div>
                        <div className={`border-2 mt-2 min-h-12 rounded p-2 transition-colors duration-200 
              ${getDropZoneStyle()}`}>
                            {children || (
                                <div className="text-gray-500 text-sm text-center">
                                    Drop block here
                                </div>
                            )}
                        </div>
                        <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-200" />
                    </div>
                );

            case BLOCK_TYPES.OPERATOR:
                return (
                    <div
                        className={`relative group transition-all duration-200
              ${isDragging ? 'opacity-50 scale-105' : ''}
              ${!isValid ? 'border-red-500' : ''}
              bg-blue-200 p-4 rounded-lg min-w-48 hover:shadow-lg`}
                    >
                        <div className="flex items-center space-x-4">
                            <div className={`border-2 p-2 min-h-12 min-w-16 rounded transition-colors duration-200
                ${getDropZoneStyle()}`}>
                                {children?.[0] || (
                                    <div className="text-gray-500 text-sm text-center">
                                        Left operand
                                    </div>
                                )}
                            </div>
                            <div className="font-bold text-blue-800 text-4xl">{value}</div>
                            <div className={`border-2 p-2 min-h-12 min-w-16 rounded transition-colors duration-200
                ${getDropZoneStyle()}`}>
                                {children?.[1] || (
                                    <div className="text-gray-500 text-sm text-center">
                                        Right operand
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-200" />
                    </div>
                );

            default:
                return (
                    <div
                        className={`relative group transition-all duration-200
              ${isDragging ? 'opacity-50 scale-105' : ''}
              ${type === BLOCK_TYPES.CONSTANT ? 'bg-green-200' : 'bg-yellow-200'}
              p-4 rounded-lg min-w-24 hover:shadow-lg`}
                    >
                        <div className={`font-bold ${type === BLOCK_TYPES.CONSTANT ? 'text-green-800' : 'text-yellow-800'}`}>
                            {value}
                        </div>
                        <div className={`absolute inset-0 ${type === BLOCK_TYPES.CONSTANT ? 'bg-green-500' : 'bg-yellow-500'} 
              opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-200`}
                        />
                    </div>
                );
        }
    };

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={`cursor-move transform transition-transform duration-200
        ${isDragging ? 'scale-105' : ''}`}
        >
            {renderBlock()}
        </div>
    );
};
