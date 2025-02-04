import React, { useState } from "react";
import { Block, BLOCK_TYPES } from "./Block";

export const EncryptionGame = () => {
    const [allBlocks, setAllBlocks] = useState([
        { type: BLOCK_TYPES.OPERATOR, value: "+" },
        { type: BLOCK_TYPES.OPERATOR, value: "*" },
        { type: BLOCK_TYPES.FUNCTION, value: "toAscii" },
        { type: BLOCK_TYPES.CONSTANT, value: "4" },
        { type: BLOCK_TYPES.PLAINTEXT, value: "Hello" }
    ]);

    const [topBlocks, setTopBlocks] = useState(
        allBlocks.filter(block => block.type === BLOCK_TYPES.OPERATOR || block.type === BLOCK_TYPES.FUNCTION)
    );

    const [bottomBlock, setBottomBlock] = useState(null);
    const [operandSelection, setOperandSelection] = useState(null); // 'left' or 'right'

    // Handles operator or function selection
    const handleOperatorClick = (block) => {
        setBottomBlock(block);
        setTopBlocks([]); // Clear top section
        setAllBlocks(prevBlocks => prevBlocks.filter(b => b !== block)); // Remove block from allBlocks
    };

    // Handles left or right operand click
    const handleOperandClick = (position) => {
        setOperandSelection(position);
        setTopBlocks(allBlocks); // Show all remaining blocks in top section
    };

    // Handles operand selection from top section
    const handleOperandSelect = (block) => {
        if (bottomBlock) {
            setBottomBlock(prev => ({
                ...prev,
                [operandSelection === "left" ? "leftOperand" : "rightOperand"]: block
            }));
        }
        setOperandSelection(null);
        setTopBlocks([]); // Clear top section
    };

    return (
        <div className="container mx-auto p-4 space-y-8">
            {/* Top Section */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Options</h2>
                <div className="grid grid-cols-3 gap-4">
                    {topBlocks.map((block, index) => (
                        <Block
                            key={index}
                            {...block}
                            onSelect={() =>
                                operandSelection
                                    ? handleOperandSelect(block)
                                    : handleOperatorClick(block)
                            }
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Result</h2>
            {bottomBlock && (
                <div className="flex items-center space-x-4">
                    {/* For function blocks, only display right operand */}
                    {bottomBlock.type !== BLOCK_TYPES.FUNCTION && (
                        <div
                            className={`border-2 p-2 rounded cursor-pointer ${
                                bottomBlock.leftOperand ? "bg-blue-300 border-blue-700" : "border-blue-500"
                            }`}
                            onClick={() => handleOperandClick("left")}
                        >
                            {bottomBlock.leftOperand ? (
                                <span className="font-semibold text-blue-900">{bottomBlock.leftOperand.value}</span>
                            ) : (
                                "Select Left Operand"
                            )}
                        </div>
                    )}
        
                    <div className="font-bold text-blue-800 text-4xl">{bottomBlock.value}</div>
        
                    {/* Right Operand */}
                    <div
                        className={`border-2 p-2 rounded cursor-pointer ${
                            bottomBlock.rightOperand ? "bg-blue-300 border-blue-700" : "border-blue-500"
                        }`}
                        onClick={() => handleOperandClick("right")}
                    >
                        {bottomBlock.rightOperand ? (
                            <span className="font-semibold text-blue-900">{bottomBlock.rightOperand.value}</span>
                        ) : (
                            "Select Right Operand"
                        )}
                    </div>
                </div>
            )}
        </div>
        
        </div>
    );
};



