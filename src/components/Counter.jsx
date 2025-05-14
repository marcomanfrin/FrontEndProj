import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "../redux/exampleActions"

const Counter = () => {
  // Per leggere lo stato di Redux uso useSelector
  const count = useSelector(state => state.example.count)

  // Per aggiornare lo stato devo usare useDispatch
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Counter Component -- {count}</h1>
      <Button onClick={() => dispatch(increment())}>+1</Button>
      <Button onClick={() => dispatch(decrement())}>-1</Button>
    </div>
  )
}

export default Counter
