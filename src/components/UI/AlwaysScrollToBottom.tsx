import { useEffect, useRef } from 'react'

export default function AlwaysScrollToBottom() {
  const elementRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => elementRef.current?.scrollIntoView({ behavior: "smooth" }));
  
  return <div ref={elementRef} />;
};