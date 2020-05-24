import {Excel} from 'src/components/excel/excel';
import './scss/index.scss';
import {Header} from 'src/components/header/header';
import {Toolbar} from 'src/components/toolbar/toolbar';
import {Formula} from 'src/components/formula/formula';
import {Table} from 'src/components/table/table';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
})

excel.render()
