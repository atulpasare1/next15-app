import { useState, useEffect } from 'react'
import CustomTextField from '@core/components/mui/TextField'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import axios from 'axios'  // You can use axios or fetch for API calls

const AutocompleteControlledUncontrolled = () => {
  // States for both controlled and uncontrolled autocomplete
  const [value, setValue] = useState(null)
  const [options, setOptions] = useState(['asdf','admin','monsd'])  // To store options from API
  const [inputValue, setInputValue] = useState('') // User's input

  // API URL (you will need to adjust this to your actual backend API)
  const API_URL = 'https://api.example.com/search'  // Example API URL

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue)
  }

  // Fetch data from the backend when input value changes
  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.length >= 2) { // Make sure the input has at least 2 characters
        try {
          const response = await axios.get(API_URL, {
            params: {
              query: inputValue // Pass the input value (2+ characters)
            }
          })
          setOptions(response.data.results) // Adjust according to the API response structure
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      } else {
        setOptions([])  // Clear options if input length is less than 2
      }
    }

    // Debounce: Delay the API call by 300ms
    const timer = setTimeout(() => {
      fetchData()
    }, 300)

    return () => clearTimeout(timer)  // Clean up the timer on every render
  }, [inputValue])

  return (
   <>
      {/* Controlled Autocomplete */}
      <CustomAutocomplete
        fullWidth
        value={value}
        options={options}
        onChange={handleChange}
        onInputChange={handleInputChange} // Capture the input value
        id='autocomplete-controlled'
        getOptionLabel={option => option.title || ''} // Adjust according to your data structure
        renderInput={params => <CustomTextField {...params} label='Controlled' />}
      />
   </>
  )
}

export default AutocompleteControlledUncontrolled
