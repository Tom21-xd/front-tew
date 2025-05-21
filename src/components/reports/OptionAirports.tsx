import React from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function OptionAirports() {
    return (
        <div className="mt-0.5 max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-center text-lg font-medium text-gray-800 mb-6">
                    Seleccione una opción
                </h3>

                <RadioGroup defaultValue="mayor" className="flex justify-between">
                    <div className="flex-1 mx-2">
                        <div className="bg-gray-50 hover:bg-blue-50 rounded-lg p-4 transition-colors duration-200 flex flex-col items-center cursor-pointer group">
                            <RadioGroupItem
                                value="mayor"
                                id="mayor"
                                className="h-5 w-5 text-blue-600 border-gray-300 group-hover:border-blue-400"
                            />
                            <Label
                                htmlFor="mayor"
                                className="mt-2 font-medium text-gray-700 group-hover:text-blue-700"
                            >
                                Mayor
                            </Label>
                        </div>
                    </div>

                    <div className="flex-1 mx-2">
                        <div className="bg-gray-50 hover:bg-blue-50 rounded-lg p-4 transition-colors duration-200 flex flex-col items-center cursor-pointer group">
                            <RadioGroupItem
                                value="menor"
                                id="menor"
                                className="h-5 w-5 text-blue-600 border-gray-300 group-hover:border-blue-400"
                            />
                            <Label
                                htmlFor="menor"
                                className="mt-2 font-medium text-gray-700 group-hover:text-blue-700"
                            >
                                Menor
                            </Label>
                        </div>
                    </div>

                    <div className="flex-1 mx-2">
                        <div className="bg-gray-50 hover:bg-blue-50 rounded-lg p-4 transition-colors duration-200 flex flex-col items-center cursor-pointer group">
                            <RadioGroupItem
                                value="promedio"
                                id="promedio"
                                className="h-5 w-5 text-blue-600 border-gray-300 group-hover:border-blue-400"
                            />
                            <Label
                                htmlFor="promedio"
                                className="mt-2 font-medium text-gray-700 group-hover:text-blue-700"
                            >
                                Promedio
                            </Label>
                        </div>
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}