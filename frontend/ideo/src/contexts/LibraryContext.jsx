import { createContext, useContext, useState } from "react";

const LibraryContext = createContext();

export const LibraryProvider = (props) => {

    const [library, setLibrary] = useState({});

    const handleUpdateLibrary = (library) => {
        console.log(`Setting LibraryContext: ${JSON.stringify(library)}`);
        library ?
            setLibrary({
                _id: library._id,
                name: library.name,
                owner: library.owner,
                resources: library.resources,
            }
            ) : setLibrary({});
    }

    return (
        <LibraryContext.Provider value={{library, handleUpdateLibrary}}>
            {props.children}
        </LibraryContext.Provider>
    )
}

export const useLibraryContext = () => {
    return useContext(LibraryContext);
}