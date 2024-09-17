const handleLocationChangeV1 = async (e, availableLocations, setLocation, setSuggestions) => {
    const input = e.target.value;
    setLocation(input);

    if(input.length > 0) {
        const suggestions = availableLocations.filter(loc => 
            loc.toLowerCase().startsWith(input.toLowerCase())
        );
        setSuggestions(suggestions);
    } else 
    setSuggestions(availableLocations);
}

export default handleLocationChangeV1;