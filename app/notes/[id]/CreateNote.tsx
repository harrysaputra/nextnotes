'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const create = async () => {
    await fetch(
      'http://127.0.0.1:8090/api/collections/notes/records',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      }
    );
    setContent('');
    setTitle('');
    router.refresh();
  };

  return (
    <form onSubmit={create} className="flex flex-col gap-5 max-w-md">
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Write title"
        className=""
      />
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing notes here..."
      />
      <button
        type="submit"
        className=" bg-yellow-50 border border-slate-600 px-5 py-3 font-medium self-start"
      >
        Create New Note
      </button>
    </form>
  );
}
