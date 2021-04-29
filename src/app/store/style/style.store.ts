import {Injectable}                                 from '@angular/core';
import {selectPersistStateInit, Store, StoreConfig} from '@datorama/akita';
import produce                                      from "immer";
import deepmerge                                    from "deepmerge";

export enum StyleValueType {
  string,
  pixels,
  ms,
  url,
}

export type StyleValue<T = StyleValueType.string | StyleValueType.pixels | StyleValueType.url | StyleValueType.ms> = {
  type: T
  value: string
}

export interface STTStyle {
  boxStyle: {
    backgroundColor: StyleValue<StyleValueType.string>;
    borderWidth: StyleValue<StyleValueType.pixels>;
    borderColor: StyleValue<StyleValueType.string>;
    borderRadius: StyleValue<StyleValueType.pixels>;
    transform: StyleValue<StyleValueType.string>;
    [key: string]: any
  };
  textStyle: {
    color: StyleValue<StyleValueType.string>;
    fontSize: StyleValue<StyleValueType.pixels>;
    fontWeight: StyleValue<StyleValueType.string>;
    textTransform: StyleValue<StyleValueType.string>;
  };
  textStyleComposite: {
    textShadow: {
      x: StyleValue<StyleValueType.pixels>;
      y: StyleValue<StyleValueType.pixels>;
      b: StyleValue<StyleValueType.pixels>;
      color: StyleValue<StyleValueType.string>;
    }

  }
  avatarStyle: {
    backgroundImage: StyleValue<StyleValueType.url>;
    marginBottom: StyleValue<StyleValueType.pixels>;
    marginRight: StyleValue<StyleValueType.pixels>;
    animationName: StyleValue<StyleValueType.string>;
    animationDuration: StyleValue<StyleValueType.ms>;
  }
}

export interface StyleState {
  currentStyle: STTStyle;
  templates: STTStyle[];
}

export const STYLE_TEMPLATE: STTStyle = {
  boxStyle:  {
    backgroundColor: {type: StyleValueType.string, value: 'transparent'},
    borderRadius: {type: StyleValueType.pixels, value: '0'},
    borderWidth: {type: StyleValueType.pixels, value: '0'},
    borderColor: {type: StyleValueType.string, value: 'transparent'},
    transform: {type: StyleValueType.string, value: 'scale(1)'}
  },
  textStyle: {
    color:         {type: StyleValueType.string, value: 'white'},
    fontSize:      {type: StyleValueType.pixels, value: '18'},
    fontWeight:    {type: StyleValueType.string, value: 'normal'},
    textTransform: {type: StyleValueType.string, value: 'none'},
  },
  textStyleComposite: {
    textShadow: {
      x:     {type: StyleValueType.pixels, value: '0'},
      y:     {type: StyleValueType.pixels, value: '0'},
      b:     {type: StyleValueType.pixels, value: '2'},
      color: {type: StyleValueType.string, value: 'black'}
    }
  },
  avatarStyle: {
    backgroundImage: {type: StyleValueType.url, value: ''},
    marginBottom:    {type: StyleValueType.pixels, value: '0'},
    marginRight:     {type: StyleValueType.pixels, value: '0'},
    animationName:   {type: StyleValueType.string, value: 'none'},
    animationDuration:   {type: StyleValueType.ms, value: '2000'},
  }
}

export const STATE_TEMPLATE: StyleState = {
  currentStyle: STYLE_TEMPLATE,
  templates:    []
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'style', producerFn: produce})
export class StyleStore extends Store<StyleState> {
  constructor() {
    super(STATE_TEMPLATE);
    selectPersistStateInit().subscribe(value => {
      this.update({
        currentStyle: deepmerge(STYLE_TEMPLATE, this.getValue().currentStyle),
        templates: this.getValue().templates.map(template => deepmerge(STYLE_TEMPLATE, template))
      });
    })
  }
}