import { Flex } from "@mantine/core"
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

	// async function fetchBoard() {
	// 	const response = await axios.get(`http://localhost:8080/board/list`);
	// 	setItems(response.data);
	// 	setItems2(response.data);
	// 	console.log(response.data);
	// 	console.log("items ", items);
	// 	console.log("items2 ", items2);
	// }

	useEffect(() => {
		let isCompleted = false;

		async function fetchBoard() {
			axios.get(`http://localhost:8080/board/list`)
			.then(response => {
				console.log(response.data);
				// console.log(response);
				setItems(response.data);
			})
			.then(() => {console.log("useState items data is ", items)})

			if (isCompleted == false) {
			}
		}

		fetchBoard();

		return() => {
			console.log("what the return..?");
		};
			
	}, []);

	return (
		<Flex>
			<h2>
				board.
			</h2>
			<div>
				{/* {items.map((item, id) => (
					<div key={id}>
						<p>
							title : {item.title}, writer : {item.writer}
						</p>
					</div>
				))} */}
			</div>
			<div>
				<Link href="/CreatePost">Create Post</Link>
			</div>
		</Flex>
	);
}

function useAsync<T>(arg0: never[]): [any, any] {
	throw new Error("Function not implemented.")
}
