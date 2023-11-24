import { styled } from 'styled-components';
import { ArrowIcon } from './Arrow-icon';
import { useState } from 'react';
import { useFilter } from '@/hooks/useFilter';
import { PriorityTypes } from '@/types/priority-types';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: var(--text-dark);

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-left: 16px;
    }
  }
`
const PriorityFilter = styled.ul`
  position: absolute;
  padding: 12px 16px;
  z-index: 999;
  width: 176px;
  border-radius: 4px;
  background: var(--shapes-01, #FFF);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.10);
  list-style: none;
  top: 100%;

  li {
    color: var(--text-dark);
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
  }

  li + li {
    margin-top: 4px;
  }
`

export function FilterByPriority(){
  const [isOpen, setIsOpen] = useState(false)
  const { setPriority } = useFilter()

  const handleOpen = () => setIsOpen(prev => !prev)

  const handleUpdatePriority = (value: PriorityTypes) => {
    setPriority(value)
    setIsOpen(false)
  }

  return(
    <FilterContainer>
      <button onClick={handleOpen}>
        Order by
        <ArrowIcon />
      </button>
      {isOpen && 
        <PriorityFilter>
          <li onClick={() => handleUpdatePriority(PriorityTypes.NEWS)}>News</li>
          <li onClick={() => handleUpdatePriority(PriorityTypes.BIGGEST_PRICE)}>Price: Higher — Lower</li>
          <li onClick={() => handleUpdatePriority(PriorityTypes.MINOR_PRICE)}>Price: Lower — Higher</li>
          <li onClick={() => handleUpdatePriority(PriorityTypes.POPULARITY)}>Best Sellers</li>
        </PriorityFilter>
      }
    </FilterContainer>
  )
}