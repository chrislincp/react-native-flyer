import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer from './ToastContainer';

this._toast = null;
const hide = () => {
  if (this._toast) this._toast.destroy();
  this._toast = null;
  // this._toast.destroy();
};
const notice = (content, opt) => {
  function animationEnd() {
    hide();
  }
  if (this._toast) {
    this._toast.destroy();
    this._toast = null;
  }

  // this._toast = new RootSiblings((
  //   <ToastContainer
  //     {...opt}
  //     content={content}
  //     onAnimationEnd={animationEnd}
  //   />
  // ));
  setTimeout(() => {
    this._toast = new RootSiblings((
      <ToastContainer
        {...opt}
        content={content}
        onAnimationEnd={animationEnd}
      />
    ));
  });
};

export default {
  notice,
  hide,
};
