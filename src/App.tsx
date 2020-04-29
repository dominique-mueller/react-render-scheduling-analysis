import React, { ReactElement, FunctionComponent, useState } from 'react';

import ProfilerResults from './profiler/ProfilerResults';
import FileUpload from './file-upload/FileUpload';

import './App.styles.css';

/**
 * App
 */
const App: FunctionComponent = (): ReactElement => {
  // State
  const [profilerResults, setProfilerResults] = useState<Array<any>>([]);

  // Handle file
  const handleFile = async (file: File): Promise<void> => {
    const fileContent: any = await new Promise((resolve): void => {
      const fileReader: FileReader = new FileReader();
      fileReader.onload = (): void => {
        resolve(JSON.parse(fileReader.result as string));
      };
      fileReader.readAsText(file);
    });
    setProfilerResults(fileContent);
  };

  // Render
  return (
    <main>
      <h2>Profiler Results</h2>
      {profilerResults.length === 0 ? <FileUpload onFile={handleFile} /> : <ProfilerResults profilerResults={profilerResults} />}
    </main>
  );
};

export default App;
