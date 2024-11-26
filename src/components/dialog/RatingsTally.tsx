import { Comment, Rating } from '@prisma/client'
import { Card, Table } from '@radix-ui/themes'
import { FC } from 'react'

interface RatingsTallyProps {
  comments: Comment[]
}

const RatingsTally: FC<RatingsTallyProps> = ({ comments }) => {
  const yeses = comments.filter((comment) => comment.rating === Rating.YES).length
  const maybes = comments.filter((comment) => comment.rating === Rating.MAYBE).length
  const nos = comments.filter((comment) => comment.rating === Rating.NO).length

  return (
    <Card className="bg-blue-200 mb-1">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Yes</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Maybe</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>No</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{yeses}</Table.Cell>
            <Table.Cell>{maybes}</Table.Cell>
            <Table.Cell>{nos}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default RatingsTally
