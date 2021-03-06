import * as React from 'react'
import TrelloList from './TrelloList'
import { connect } from 'react-redux'
import TrelloActionButton from './TrelloActionButton'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { sort } from '../actions/listsActions'
import styled from 'styled-components'

const ListContainer = styled.div`
  display: felx;
  flex-direction: row;
`

class App extends React.Component<{ lists: []; dispatch: any }> {
  onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    )
  }

  render() {
    const { lists } = this.props
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
          <h2>hello</h2>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <ListContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map(
                  (
                    list: {
                      id: number
                      title: string
                      cards: [{ id: number; text: string }]
                    },
                    index
                  ) => (
                    <TrelloList
                      listID={list.id}
                      key={list.id}
                      title={list.title}
                      cards={list.cards}
                      index={index}
                    />
                  )
                )}
                {provided.placeholder}
                <TrelloActionButton list />
              </ListContainer>
            )}
          </Droppable>
      </DragDropContext>
    )
  }
}


const mapStateToProps = (state: { lists: [] }) => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App)
