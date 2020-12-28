export default {
  en: {
    base: {
      add: 'Add',
      edit: 'Edit',
      cancel: 'Cancel',
    },
    box: {
      title: 'Box',
      submitAdd: 'Add box',
      submitEdit: 'Edit box',
      placeholder: {
        name: 'Please input name.',
        description: 'Please input description.',
      },
      removeMessage: 'Are you sure you want to delete it?',
    },
    board: {
      today: 'Go to today',
    },
    preference: {
      title: 'Preference',
      save: 'Save',
      language: 'Language',
      dateFormat: 'Date format',
      year: 'y',
      month: 'm',
      day: 'd',
      theme: 'Theme',
      reset: {
        title: 'Reset Database',
        description: 'You can reset the database.',
        confirm: `Do you really want to reset the database?\nThis action refreshes the page.`,
      },
      backup: {
        title: 'Backup data',
        description: 'Save the database and preference as a JSON file.',
        buttonLabel: 'Backup all data',
        confirm: `Do you really want to backup the all data?\nThe backed up content is saved as a json file.`,
        errorNoFile: 'No files were selected.',
      },
      restore: {
        title: 'Restore data',
        description: 'All data is restored.',
        buttonLabel: 'Restore all data',
        confirm: `Do you really want to restore all your data?\nThis will delete all current data.`,
        complete: 'Complete restore data.',
      },

    },
    error: {
      notSupport: {
        title: 'Support error',
        description: 'This browser is not supported.',
      },
      unknown: {
        title: 'Unknown error',
        description: 'An unknown error has occurred.',
      },
    },
  },
  ko: {
    base: {
      add: '추가하기',
      edit: '수정하기',
      cancel: '취소하기',
    },
    box: {
      title: '박스',
      submitAdd: '추가하기',
      submitEdit: '수정하기',
      placeholder: {
        name: '이름을 입력해주세요.',
        description: '설명을 입력해주세요.',
      },
      removeMessage: '정말 삭제하겠습니까?',
    },
    board: {
      today: '오늘로 이동',
    },
    preference: {
      title: '설정',
      save: '저장',
      language: '언어',
      dateFormat: '날짜포맷',
      year: '년',
      month: '월',
      day: '일',
      theme: '테마',
      reset: {
        title: '데이터베이스 초기화',
        description: '데이터베이스를 초기화 할 수 있습니다.',
        confirm: `정말 데이터베이스를 재설정 할까요?\n이 작업은 페이지를 새로고침 합니다.`,
      },
      backup: {
        title: '데이터 백업',
        description: '데이터베이스와 설정값을 JSON 파일로 저장합니다.',
        buttonLabel: '모든 데이터 백업',
        confirm: `정말 모든 데이터를 백업할까요?\n백업한 내용은 json 파일로 저장됩니다.`,
        errorNoFile: '선택한 파일이 없습니다.',
      },
      restore: {
        title: '데이터 복원',
        description: '모든 데이터를 복원합니다.',
        buttonLabel: '모든 데이터 복원',
        confirm: `정말 모든 데이터를 복원할까요?\n이 작업은 현재 데이터가 모두 삭제됩니다.`,
        complete: '복원을 완료했습니다.',
      },
    },
    error: {
      notSupport: {
        title: '지원오류',
        description: '이 브라우저는 지원되지 않습니다.',
      },
      unknown: {
        title: '알 수 없는 오류',
        description: '알 수 없는 오류가 발생했습니다.',
      },
    },
  },
}
