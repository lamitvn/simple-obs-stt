import {Injectable}           from '@angular/core';
import {STTStyle, StyleStore} from './style.store';
import {NetworkService}       from "@store/network/network.service";

@Injectable({providedIn: 'root'})
export class StyleService {
  constructor(
    private styleStore: StyleStore,
    private networkService: NetworkService) {
    networkService.messages$.subscribe(m => m.type === 'style' && this.UpdateStyle(m.data))
    networkService.onClientConnected$.subscribe(_ => this.SendUpdatedStyle());
  }

  private SendUpdatedStyle() {
    this.networkService.SendMessage({type: 'style', data: this.styleStore.getValue().currentStyle})
  }

  private UpdateStyle(styleState: STTStyle) {
    this.styleStore.update(state => {
      state.currentStyle = styleState;
    });
  }

  UpdateBoxStyle(style: Partial<{[key in keyof STTStyle["boxStyle"]]: string | number}>) {
    this.styleStore.update(state => {
      for (let styleKey in style)
        state.currentStyle.boxStyle[styleKey].value = style[styleKey]
    });
    this.SendUpdatedStyle();
  }

  UpdateTextComposite(compositeKey: keyof STTStyle["textStyleComposite"], value: object) {
    this.styleStore.update(state => {
      for (let styleKey in value)
        { // @ts-ignore
          state.currentStyle.textStyleComposite[compositeKey][styleKey].value = value[styleKey];
        }
    })
    this.SendUpdatedStyle();
  }


  UpdateTextStyle(style: Partial<{[key in keyof STTStyle["textStyle"]]: string}>) {
    this.styleStore.update(state => {
      for (let styleKey in style)
        { // @ts-ignore
          state.currentStyle.textStyle[styleKey].value = style[styleKey];
        }
    });
    this.SendUpdatedStyle();
  }
}
