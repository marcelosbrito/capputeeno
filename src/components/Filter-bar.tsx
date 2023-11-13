"use client"

import styled from 'styled-components';
import { FilterByType } from './Filter-by-type';

interface FilterBarProps{

}

const FilterContainer = styled.div`
  display:flex;
  width: 100%;
  align-items: start;
`

export function FilterBar(props : FilterBarProps) {
  return(
    <FilterContainer>
      <FilterByType />
    </FilterContainer>
  )
};
