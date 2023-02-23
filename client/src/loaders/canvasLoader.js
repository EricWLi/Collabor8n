async function canvasLoader({ params }) {
  const res = await fetch(`/api/canvases/${params.canvasId}`);
  const body = await res.json();

  if (!res.ok) {
    return {
      error: true,
      status: res.status,
      message: body?.message
    };
  }

  return body;
}

export default canvasLoader;