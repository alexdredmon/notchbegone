import React from 'react'


const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


class If extends React.Component {
  render = () => {
    const { children, condition } = this.props

    if (condition) {
      return children
    }
    return null
  }
}

export { getBase64, If }
