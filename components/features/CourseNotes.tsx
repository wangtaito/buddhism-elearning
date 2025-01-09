'use client';

import { useState } from 'react';

interface Note {
  id: string;
  content: string;
  timestamp: number;
  chapterIndex: number;
}

export default function CourseNotes({ courseId, chapterIndex }: { courseId: string; chapterIndex: number }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      timestamp: Date.now(),
      chapterIndex
    };

    setNotes([...notes, note]);
    setNewNote('');
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">課程筆記</h3>
      <div className="space-y-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="添加筆記..."
          className="w-full p-2 border rounded-md"
          rows={3}
        />
        <button
          onClick={addNote}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          保存筆記
        </button>
        <div className="space-y-2 mt-4">
          {notes.map(note => (
            <div key={note.id} className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm">{note.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(note.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 