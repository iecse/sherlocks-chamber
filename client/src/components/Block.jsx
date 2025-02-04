import React, { useState } from "react";

export const BLOCK_TYPES = {
    OPERATOR: "operator",
    FUNCTION: "function",
    CONSTANT: "constant",
    PLAINTEXT: "plaintext",
};

export const Block = ({ type, leftOperand, rightOperand, value, onSelect, onOperandSelect }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleBlockClick = () => {
        if (type === BLOCK_TYPES.OPERATOR || type === BLOCK_TYPES.FUNCTION) {
            setIsExpanded(prev => !prev);
        }
        onSelect && onSelect({ type, leftOperand, rightOperand, value });
    };

    const handleOperandClick = (position) => {
        onOperandSelect && onOperandSelect(position);
    };

    return (
        <div className="p-4 rounded-lg shadow-md cursor-pointer" onClick={handleBlockClick}>
            {type === BLOCK_TYPES.OPERATOR && (
                <div className="bg-blue-200 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        {/* Left Operand */}
                        <div
                            className={`border-2 p-2 rounded cursor-pointer ${leftOperand ? "bg-blue-300 border-blue-700" : "border-blue-500"}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOperandClick("left");
                            }}
                        >
                            {leftOperand ? (
                                <span className="font-semibold text-blue-900">{leftOperand.value}</span>
                            ) : (
                                "Select Left Operand"
                            )}
                        </div>

                        <div className="font-bold text-blue-800 text-4xl">{value}</div>

                        {/* Right Operand */}
                        <div
                            className={`border-2 p-2 rounded cursor-pointer ${rightOperand ? "bg-blue-300 border-blue-700" : "border-blue-500"}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOperandClick("right");
                            }}
                        >
                            {rightOperand ? (
                                <span className="font-semibold text-blue-900">{rightOperand.value}</span>
                            ) : (
                                "Select Right Operand"
                            )}
                        </div>
                    </div>

                    {isExpanded && (
                        <div className="mt-4">
                            {leftOperand && <Block {...leftOperand} onSelect={onSelect} onOperandSelect={onOperandSelect} />}
                            {rightOperand && <Block {...rightOperand} onSelect={onSelect} onOperandSelect={onOperandSelect} />}
                        </div>
                    )}
                </div>
            )}

            {type === BLOCK_TYPES.FUNCTION && (
                <div className="bg-purple-200 p-4 rounded-lg">
                    <div className="font-bold text-purple-800">{value}</div>
                    {/* Right Operand */}
                    {rightOperand && (
                        <div
                            className={`border-2 p-2 rounded cursor-pointer ${rightOperand ? "bg-blue-300 border-blue-700" : "border-blue-500"}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleOperandClick("right");
                            }}
                        >
                            {rightOperand ? (
                                <span className="font-semibold text-blue-900">{rightOperand.value}</span>
                            ) : (
                                "Select Right Operand"
                            )}
                        </div>
                    )}

                    {isExpanded && rightOperand && (
                        <div className="mt-2">
                            <Block {...rightOperand} onSelect={onSelect} onOperandSelect={onOperandSelect} />
                        </div>
                    )}
                </div>
            )}

            {type === BLOCK_TYPES.CONSTANT && (
                <div className="bg-green-200 p-4 rounded-lg">
                    <div className="font-bold text-green-800">{value}</div>
                </div>
            )}

            {type === BLOCK_TYPES.PLAINTEXT && (
                <div className="bg-yellow-200 p-4 rounded-lg">
                    <div className="font-bold text-yellow-800">{value}</div>
                </div>
            )}
        </div>
    );
};







