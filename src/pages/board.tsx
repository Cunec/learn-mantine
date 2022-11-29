import { Button, Flex } from "@mantine/core"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Board {
  id : string
  title : string
  content : string
  writer : string
  createdDate : string
  replyList? : {}
}

export default function Board() {
	const [items, setItems] = useState<Board[]>([]);

	useEffect(() => {
		// let isCompleted = false;

		async function fetchBoard() {
			const result = await axios.get(`http://localhost:8080/board/list`)
        .then(response => {
          console.log("data is ", response.data);
          console.log("responseData is ", response.data.responseData);
          console.log("error is ", response.data.error);
          setItems(response.data.responseData);
        });

			// if (!isCompleted) {
				// setItems(result);
			// }
		}

		fetchBoard();

		// return() => {
    //   isCompleted = true;
		// 	console.log("isCompleted true!");
		// };
			
	}, []);

	return (
    <Flex
      mih={50}
      //bg="rgba(0, 0, 0, .3)"
      gap="md"
      justify="flex-start"
      align="flex-start"
      direction="column"
      // mt="-25px"
      // wrap="wrap"
    >
      <h3>
				Board
			</h3>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <p>
              title : {item.title}, writer : {item.writer}
            </p>
          </div>
        ))}
      </div>
      <Button 
        component={Link}
        href="/board/create"
        color="gray"
      >
        Create Post
      </Button>
    </Flex>
	);
}

