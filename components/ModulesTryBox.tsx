"use client";
import React, { useState, ChangeEvent, FC } from "react";
import { ExternalLink } from "lucide-react";

interface ModuleItem {
  name: string;
}

interface CategoryItem {
  name: string;
  children: ModuleItem[];
}

const filterData = (data: CategoryItem[], term: string): CategoryItem[] => {
  if (!term) return data;
  return data
    .map((category) => {
      // Filter child modules by name
      const filteredChildren = category.children.filter((mod) =>
        mod.name.toLowerCase().includes(term.toLowerCase())
      );

      // If category name matches or if any child matches, keep them
      if (
        category.name.toLowerCase().includes(term.toLowerCase()) ||
        filteredChildren.length > 0
      ) {
        return { ...category, children: filteredChildren };
      }
      return null;
    })
    .filter(Boolean) as CategoryItem[];
};

const ModulesTryBox: FC = () => {
  // Sample hierarchical data: categories -> modules
  const [moduleData] = useState<CategoryItem[]>([
    {
      name: "Image, Audio and Video",
      children: [
        { name: "GenerateImage" },
        { name: "UpscaleImage" },
        { name: "UpscaleVideo" },
        { name: "InterpolateFrames" },
        { name: "IsolateVocals" },
      ],
    },
    {
      name: "Math",
      children: [
        { name: "AskWolframAlpha" },
        { name: "Plot" },
        { name: "Calculate" },
        { name: "De-Plot" },
        { name: "Solve" },
      ],
    },
    {
      name: "Utility",
      children: [
        { name: "ExportToPDF" },
        { name: "Combine PDFs" },
        { name: "Extract PDF Data" },
      ],
    },
    {
        name: "Language",
        children: [
          { name: "Translate" },
          { name: "Summarize" },
          { name: "ExtractEntities" },
          { name: "AnalyzeSentiment" },
        ],
      },
      {
        name: "Context",
        "children": [
          { name: "GetContext" },
          { name: "AddToContext" },
          { name: "ClearContext" },
          { name: "QueryContext" },
        ],
      }
  ]);

  // State for search term and currently selected module
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(null);

  const filteredData = filterData(moduleData, searchTerm);

  return (
    <section className="text-center">
        <div className="bg-black border border-white rounded-[32px] mt-6 pl-10 pb-10 pr-10 pt-6 h-[600px] flex flex-col">
            <p className="text-gray-200 pb-4">Try them out!</p>
            <div className="flex flex-col sm:flex-row w-full h-full overflow-hidden">
                {/* Sidebar - with fixed height and scroll */}
                <div className="w-full sm:w-64 flex flex-col pr-0 sm:pr-4 h-full">
                    <div className="mb-4">
                        <input 
                            className="w-full p-2 rounded text-gray-200 border border-white placeholder-gray-500"
                            placeholder="Search modules..."
                            value={searchTerm}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setSearchTerm(e.target.value)
                            }
                        />
                    </div>
                            {/* Todo: fix the search modules scroll top field */}
                    {/* Added max-height and overflow-y-auto for scrolling */}
                    <div className="flex-1 sm:w-60 bg-black rounded-lg p-4 overflow-y-auto text-left border">
                        <div className="space-y-4">
                            {filteredData.map((category) => (
                                <div key={category.name} className="mb-4">
                                    <h3 className="text-white font-bold mb-1 sticky top-0 bg-black p-2">
                                        {category.name}
                                    </h3>
                                    <div className="space-y-1">
                                        {category.children.map((mod) => (
                                            <div
                                                key={mod.name}
                                                className="pl-4 py-1 text-gray-300 cursor-pointer hover:text-orange-500"
                                                onClick={() => setSelectedModule(mod)}
                                            >
                                                {mod.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main content area */}
                <div className="flex flex-col w-full bg-gray-900 rounded-lg p-6 overflow-auto hidden sm:block">
                    {selectedModule ? (
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                {selectedModule.name}
                            </h2>
                            <p className="mt-3 text-sm text-gray-400">
                                This is filler content describing the &quot;{selectedModule.name}&quot; module.
                                <br />
                                In a real app, you might show parameters, usage examples, or documentation here.
                            </p>
                            <button
                                onClick={() => window.open(`/modules/${selectedModule.name}`, "_blank")}
                                className="mt-5 bg-orange-500 text-black px-4 py-2 rounded font-semibold hover:bg-orange-400 sm:text-orange-500"
                            >
                                Try Module
                            <ExternalLink className="inline-block ml-2 w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-500">
                        Select a module from the sidebar to see details.
                        </p>
                    )}
                </div>
            </div>
        </div>
    </section>
  );
};

export default ModulesTryBox;