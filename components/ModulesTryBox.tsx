"use client";
import React, { useState, ChangeEvent, FC } from "react";

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
      name: "Images",
      children: [
        { name: "Generate Image" },
        { name: "Edit Image" },
        { name: "Upscale Image" },
      ],
    },
    {
      name: "Text",
      children: [
        { name: "Summarize Text" },
        { name: "Translate Language" },
        { name: "Analyze Sentiment" },
      ],
    },
    {
      name: "Documents",
      children: [
        { name: "Generate PDF" },
        { name: "Combine PDFs" },
        { name: "Extract PDF Data" },
      ],
    },
  ]);

  // State for search term and currently selected module
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(null);

  const filteredData = filterData(moduleData, searchTerm);

  return (
    <div className="bg-black border border-white rounded-xl mt-6 mx-5 p-10 h-[600px] flex flex-col">
      {/* 2-column layout: fill the vertical space */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 mr-4 bg-gray-800 rounded-lg p-4 overflow-auto text-left">
          {/* Search box */}
          <div className="mb-4">
            <input
              className="w-full p-2 rounded bg-gray-900 text-gray-200 border border-gray-700 placeholder-gray-500"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          {/* Hierarchical list of categories & modules */}
          {filteredData.map((category) => (
            <div key={category.name} className="mb-4">
              <h3 className="text-white font-bold mb-1 pl-2">{category.name}</h3>
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
          ))}
        </div>

        {/* Main content area */}
        <div className="flex-1 bg-gray-900 rounded-lg p-6 overflow-auto">
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
              <button className="mt-5 bg-orange-500 text-black px-4 py-2 rounded font-semibold hover:bg-orange-400">
                Run Module
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
  );
};

export default ModulesTryBox;