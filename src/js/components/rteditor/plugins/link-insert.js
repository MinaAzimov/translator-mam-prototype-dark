import React, { PropTypes } from 'react';
import { Entity } from 'draft-js';

import { Entity as E } from '../../util/constants';
import {
  EditorState,
  convertFromRaw,
  CompositeDecorator,
  } from 'draft-js';


export const findLinkEntities = (contentBlock, callback) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
      entityKey !== null &&
      Entity.get(entityKey).getType() === E.LINK
      );
    },
    callback
  );
};

const _Link = (props) => {
  const { url } = Entity.get(props.entityKey).getData();
  return (
    <a
      className="md-link hint--top hint--rounded"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={url}
    >{props.children}</a>
  );
};

_Link.propTypes = {
  children: PropTypes.node,
  entityKey: PropTypes.string,
};

export const Link = _Link;

const defaultDecorators = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);


const createEditorState = (content = null, decorators = defaultDecorators) => {
  if (content === null) {
    return EditorState.createEmpty(decorators);
  }
  return EditorState.createWithContent(convertFromRaw(content), decorators);
};


export default createEditorState;