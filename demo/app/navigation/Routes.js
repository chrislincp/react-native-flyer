import ButtonPage from '../src/components/Button';
import CardPage from '../src/components/Card';
import DialogPage from '../src/components/Dialog';
import FormPage from '../src/components/Form';
import PopMenuPage from '../src/components/PopMenu';
import ActivityIndicatorPage from '../src/components/ActivityIndicator';
import ToastPage from '../src/components/Toast';
import DragListPage from '../src/components/DragList';

const routes = {
  ActivityIndicator: { screen: ActivityIndicatorPage },
  Button: { screen: ButtonPage },
  Card: { screen: CardPage },
  Dialog: { screen: DialogPage },
  DragList: { screen: DragListPage },
  Form: { screen: FormPage },
  PopMenu: { screen: PopMenuPage },
  Toast: { screen: ToastPage },
};

export default routes;
