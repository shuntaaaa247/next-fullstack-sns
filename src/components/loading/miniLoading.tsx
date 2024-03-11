const MiniLoading = () => {
  return (
    <div className="flex justify-center " aria-label="読み込み中">
      <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  )
}

export default MiniLoading