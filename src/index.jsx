import React from 'react';
import { createRoot } from 'react-dom/client';

// import style
import './styles/style.css';
import NoteAppBody from './components/NoteAppBody.jsx';

const root = createRoot(document.getElementById('root'));
root.render(<NoteAppBody />);
