import { Comment, Rating } from '@prisma/client'
import { Badge, Card, Flex, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { FC } from 'react'

interface CommentProps {
  comment: Comment
}

const RatingBadgeMap = {
  [Rating.YES]: <Badge color="green">Yes</Badge>,
  [Rating.MAYBE]: <Badge color="amber">Maybe</Badge>,
  [Rating.NO]: <Badge color="red">No</Badge>
}

const CommentItem: FC<CommentProps> = ({ comment }) => {
  return (
    <Card className="mb-0.5">
      <Flex direction="column">
        <Flex justify="between">
          {RatingBadgeMap[comment.rating]}
          <Text size="2" color="gray">
            {format(new Date(comment.createdAt), 'HH:mm dd/MM/yyyy')}
          </Text>
        </Flex>
      </Flex>
      <Text size="2" className="ml-2">
        {comment.text}
      </Text>
    </Card>
  )
}

export default CommentItem
