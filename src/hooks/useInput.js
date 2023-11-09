import { useState } from 'react';

function useInput(defaultValue = '', isHTMLInput = false) {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange({ target }) {
    setValue(isHTMLInput ? target.innerHTML : target.value);
  }

  return [value, setValue];
}

export default useInput;
