const Loading = () => {
  return (
    <div className="flex justify-center mt-5" aria-label="読み込み中">
      <div className="animate-spin h-10 w-10 border-2 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  )
}

export default Loading