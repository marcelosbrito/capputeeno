"use client"

import styled from 'styled-components';
import { FilterByType } from './Filter-by-type';
import { FilterByPriority } from './Filter-by-priority';

interface FilterBarProps{

}

const FilterContainer = styled.div`
  display:flex;
  width: 100%;
  align-items: start;
  justify-content: space-between;
`

export function FilterBar(props : FilterBarProps) {
  return(
    <FilterContainer>
      <FilterByType />
      <FilterByPriority />
    </FilterContainer>
  )
};
