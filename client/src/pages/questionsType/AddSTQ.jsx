import React from 'react'

function AddSTQ({question , setQuestion}) {
  return (
      <div>
        <label>Question:</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          className="w-full p-2 text-white border-2 border-black rounded-2xl outline-none"
        />
      </div>
  )
}

export default AddSTQ