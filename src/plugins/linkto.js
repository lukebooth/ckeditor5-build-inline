import linkToIcon from '@ckeditor/ckeditor5-link/theme/icons/link.svg';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import LinkCommand from '@ckeditor/ckeditor5-link/src/linkcommand';

export default class LinkTo extends Plugin {
  static get pluginName() {
    return 'Link to';
  }

  init() {
    const editor = this.editor;

    editor.model.schema.extend('$text', { allowAttributes: 'linkHref' });

    editor.on('linkTo_urlSelected', (evt, url) => {
      editor.execute( 'link', url );
    })

    editor.ui.componentFactory.add('linkto', locale => {
      const button = new ButtonView(locale);

      button.set({
        label: 'Link to',
        icon: linkToIcon,
        tooltip: true
      });

      // Callback executed once the image is clicked.
      button.on('execute', () => {
        editor.fire('linkTo_showOptions');
      });

      return button;
    });
  }
}
