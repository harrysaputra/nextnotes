import Link from 'next/link';

async function getNotes() {
  const res = await fetch(
    'http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=10'
  );

  console.log('res', res);
  const data = await res.json();
  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div>
      <h1>Notes page</h1>
      <div>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};
  return (
    <Link href={`notes/${id}`}>
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        <span>{created}</span>
      </div>
    </Link>
  );
}
