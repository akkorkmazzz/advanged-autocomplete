import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box, Checkbox } from '@mui/material';
import Chip from '@mui/material/Chip';
import { CloseIcon } from '../../utils/IconsUtils';
import Highlighter from "react-highlight-words";
import { useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/reducers/CharactersSlice';

import styles from './AdvangedAutocomplete.module.scss';

const AdvangedAutocomplete = ({ data, page, setPage }) => {

  const [characterDatas, setCharacterDatas] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setCharacterDatas(data);
  },[data])

  const loadMoreResults = () => {
    const nextPage = page + 1;
    getDatas(nextPage)
  };

  const getDatas = (nextPage) => {
    setPage(nextPage);
    dispatch(fetchCharacters(nextPage))
  }

  const handleScroll = (event) => {
    const listboxNode = event.currentTarget;

    const position = listboxNode.scrollTop + listboxNode.clientHeight;
    if (listboxNode.scrollHeight - position <= 1) {
      loadMoreResults();
    }
  };


  useEffect(() => {
    setCharacterDatas(data.filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
  },[search])
  return (
    <Box>
      <Autocomplete
        multiple
        limitTags={7}
        id="multiple-autocomplete"
        options={characterDatas && characterDatas}
        getOptionLabel={(option) => option.name + ' ' + option.id}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={() => {setSearch("")}}
        renderInput={(params) => (
            <TextField {...params} label="Characters" placeholder="Select Character" onChange={(e) => setSearch(e.target.value)} />
        )}
        renderOption={(props, option) => (
          <Box
            key={option.id}
            component="li"
            style={{padding: "12px 6px"}}
            {...props}
          >
            <Checkbox checked={props['aria-selected']} />
            <Box>
              <img style={{width: "60px", height: "60px", borderRadius: "6px"}} src={option.image} alt="" />
            </Box>
            <Box style={{display: "grid", marginLeft: "10px", color: "#475569", fontSize: "22px"}}>
              <Highlighter
                highlightClassName={styles.highlighterClass}
                searchWords={[search]}
                autoEscape={true}
                textToHighlight={option.name}
                highlightStyle = {{
                    backgroundColor: 'transparent',
                    fontWeight: 'bold',
                    color: "#475569"
                }}
              />
              <span style={{color: "#475569", fontSize: "18px"}}>{`${option.episode.length} Episodes`}</span>
            </Box>
          </Box>
        )}
        sx={{
          borderRadius: "20px",
          width: '100%',
          '& .MuiOutlinedInput-root': {
            border: "1px solid #E2E8F0",
            borderRadius: "20px",
          },
        }}
        renderTags={(value, props) =>
          value.map((option, index) => (
              <Chip
                  {...props({ index })}
                  label={option.name}
                  sx={{
                    height: "36px",
                    background: "#E2E8F0",
                    border: "1px solid #6D809F3D",
                    borderRadius: "12px",
                    marginTop: "4px",
                    fontSize: "16px",
                    color: "#334155",
                  
                    "& .MuiChip-label": {
                      marginTop: "2px",
                    },
                    '& .MuiChip-deleteIcon': {
                      backgroundColor: "#94A3B8",
                      borderRadius: "6px",
                      padding: "2px",
                      "&:hover": {
                        background: "#a4afbf"
                      },
                    },
                  }}
                  key={option.id}
                  deleteIcon={CloseIcon({ color: "#F8FAFC" })}
              />
          ))
        }
        ListboxProps={{
          onScroll: handleScroll
        }}
      />
    </Box>
  )
}

export default AdvangedAutocomplete;