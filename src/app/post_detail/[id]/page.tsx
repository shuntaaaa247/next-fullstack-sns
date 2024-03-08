import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const PostDetail = ({ params }: { params: Params }) => {
  return (
    <div>
      {params.id}
      PostDetail
    </div>
  )
}

export default PostDetail