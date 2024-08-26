import { useCallback } from "react";

const useOnDropV1 = (setFiles) => {
    return useCallback ((acceptedFiles)=> {
        if(acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file => 
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ]);
        }
    }, [setFiles]);
};

export default useOnDropV1;