
import React, { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';

const REQUIRED_FIELDS = ['name', 'price', 'ean', 'stock'];

const FileUploaderMapper = () => {
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      parseFile(selectedFile);
    }
  };

  const parseFile = (fileToParse: File) => {
    Papa.parse(fileToParse, {
      header: true,
      skipEmptyLines: true,
      preview: 5, // Show first 5 rows as preview
      complete: (results) => {
        if (results.meta.fields) {
          setHeaders(results.meta.fields);
          setData(results.data);
          // Auto-map based on header names
          const initialMap: Record<string, string> = {};
          REQUIRED_FIELDS.forEach(field => {
             const foundHeader = results.meta.fields?.find(h => h.toLowerCase().includes(field.toLowerCase()));
             if(foundHeader) initialMap[field] = foundHeader;
          });
          setMapping(initialMap);
          setStep(2);
        }
      },
    });
  };
  
  const handleMappingChange = (requiredField: string, selectedHeader: string) => {
    setMapping(prev => ({ ...prev, [requiredField]: selectedHeader }));
  };
  
  const isMappingComplete = () => {
    return REQUIRED_FIELDS.every(field => mapping[field] && mapping[field] !== '');
  };

  const handleImport = () => {
      if(!isMappingComplete()) {
        alert("Por favor, mapeie todos os campos obrigatórios.");
        return;
      }
      // In a real app, you would send the file and mapping to the backend
      // for full processing and validation.
      console.log("Importing with mapping:", mapping);
      alert("Importação iniciada! (Simulação)");
      setStep(3);
  };

  return (
    <div>
      {step === 1 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
            <label htmlFor="file-upload" className="mt-2 block text-sm font-medium text-primary hover:text-blue-700 cursor-pointer">
                <span>Carregar um ficheiro</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".csv" onChange={handleFileChange} />
            </label>
            <p className="mt-1 text-xs text-gray-500">CSV até 10MB</p>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Mapear Colunas</h3>
          <p className="mb-4 text-sm text-gray-600">Associe as colunas do seu ficheiro aos campos necessários no sistema.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {REQUIRED_FIELDS.map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">{field} <span className="text-red-500">*</span></label>
                <select 
                    value={mapping[field] || ''}
                    onChange={(e) => handleMappingChange(field, e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                  <option value="">-- Selecione uma coluna --</option>
                  {headers.map(header => <option key={header} value={header}>{header}</option>)}
                </select>
              </div>
            ))}
          </div>

          <h4 className="font-semibold mb-2">Pré-visualização dos Dados</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>{headers.map(h => <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>)}</tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, i) => <tr key={i}>{headers.map(h => <td key={h} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row[h]}</td>)}</tr>)}
              </tbody>
            </table>
          </div>

           <div className="mt-6 flex justify-end">
                <button onClick={handleImport} disabled={!isMappingComplete()} className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                    Validar e Importar
                </button>
           </div>
        </div>
      )}
      
      {step === 3 && (
        <div className="text-center p-8">
            <h3 className="text-xl font-semibold text-green-600">Importação Concluída!</h3>
            <p className="mt-2 text-gray-600">Os seus dados foram submetidos para processamento. Será notificado quando terminar.</p>
            <button onClick={() => setStep(1)} className="mt-6 bg-primary text-white font-bold py-2 px-4 rounded-lg">
                Nova Importação
            </button>
        </div>
      )}
    </div>
  );
};

export default FileUploaderMapper;
