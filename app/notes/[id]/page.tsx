async function getNote(noteId: String) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function NotePage({ params }: any) {
  const { id, title, content, created } = await getNote(params.id);
  return (
    <div>
      <h1>Notes/{id}</h1>
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        <span>{created}</span>
      </div>
    </div>
  );
}
