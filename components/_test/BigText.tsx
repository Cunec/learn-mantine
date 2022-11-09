export default function BigText() {
    
  const rendering = () => {
    const result = [];
    result.push(<div key={0}>start</div>);
    for (let i = 1; i < 99; i++) {
      result.push(<div key={i}>{'abcdefghijklmnopqrstuvwxyz'}</div>);
    }
    result.push(<div key={100}>end</div>);
    return result;
  };

  return (
    <div>
      {rendering()}
    </div>
  )
}