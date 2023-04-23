
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// creates a single li element using the passed props to WrappedSingleListItem function
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li key={index}
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

// sets check on props datatype passed to WrappedSingleListItem
WrappedSingleListItem.propTypes = {
  index: PropTypes.number,      // index must be a number
  isSelected: PropTypes.bool,       // isSelected must be a boolean value
  onClickHandler: PropTypes.func.isRequired,    // onClickHandler must be a function and it is must to be sent
  text: PropTypes.string.isRequired,        // text must be a string and is must 
};

const SingleListItem = memo(WrappedSingleListItem);  
// memo is a higher order react component, it optimizes the performance by :
// when re-rendering happens, the memo() function compares the current props of SingleListItem toits  previous props 
// and re-renders the SingleListItem only if the props were changed.
// So it prevents unnecessary re-rendering, hence optimizing the performance

// uses SingleListItem to create an unordered list of items (created using SingleListItem)
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem key={index}
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  )
};

// ensures that props passed to WrappedListComponent are of the type as described in below check
WrappedListComponent.propTypes = {
    // `items` should be an array like: [{text: 'foo'}, {text: 'bar'}]
    // i.e. it should have objects, where each object must have a key as `text`, and its value must be a string
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};

// the default props to WrappedListComponent can be null
WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);  
// List is a memoized verson of WrappedListComponent, 
// when re-rendering happens, then the new (current) props of List are compared with it's previous props, if both are same, then 
// List will not re-render, but if new props are different than previous, only then re-rendering of List will happen 
// This saves us from re-rendering the List when it's props did not change, and hence we optimize the performance by avoiding unnecessary re-renders.

export default List;        
// exporting the most optimized List

