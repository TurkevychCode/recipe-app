import React, { useState } from "react";

import { FormControl, TextField } from "@mui/material";

interface SearchBoxProps {
  search: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = React.memo(
  ({ search, onSearchChange }) => {
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      const englishOnly = /^[A-Za-z\s]*$/;

      if (!englishOnly.test(value)) {
        setError("Please use only English letters.");
        event.target.value = search;
      } else {
        setError(null);
        onSearchChange(event);
      }
    };

    return (
      <FormControl variant="outlined" sx={{ flexGrow: 1, maxWidth: 600 }}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleChange}
          inputProps={{ maxLength: 100 }}
          sx={{
            backgroundColor: "#fafafa",
            borderRadius: "4px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "4px",
            },
          }}
          helperText={error}
          error={!!error}
        />
      </FormControl>
    );
  }
);

export default SearchBox;
