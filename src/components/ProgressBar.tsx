interface ProgressBarProps {
    currentSection: number;
    totalSections: number;
  }
  
  export const ProgressBar: React.FC<ProgressBarProps> = ({
    currentSection,
    totalSections
  }) => {
    const progress = ((currentSection + 1) / totalSections) * 100;
  
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
        <div className="text-sm text-gray-600 mt-2">
          Section {currentSection + 1} of {totalSections}
        </div>
      </div>
    );
  };
