/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateActivityDay = /* GraphQL */ `
  subscription OnCreateActivityDay($owner: String!) {
    onCreateActivityDay(owner: $owner) {
      id
      daysInSecs
      activities {
        items {
          id
          activityID
          title
          description
          timeStart
          duration
          categories
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      journalEntry
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateActivityDay = /* GraphQL */ `
  subscription OnUpdateActivityDay($owner: String!) {
    onUpdateActivityDay(owner: $owner) {
      id
      daysInSecs
      activities {
        items {
          id
          activityID
          title
          description
          timeStart
          duration
          categories
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      journalEntry
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteActivityDay = /* GraphQL */ `
  subscription OnDeleteActivityDay($owner: String!) {
    onDeleteActivityDay(owner: $owner) {
      id
      daysInSecs
      activities {
        items {
          id
          activityID
          title
          description
          timeStart
          duration
          categories
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      journalEntry
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateActivity = /* GraphQL */ `
  subscription OnCreateActivity($owner: String!) {
    onCreateActivity(owner: $owner) {
      id
      activityID
      title
      description
      timeStart
      duration
      categories
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateActivity = /* GraphQL */ `
  subscription OnUpdateActivity($owner: String!) {
    onUpdateActivity(owner: $owner) {
      id
      activityID
      title
      description
      timeStart
      duration
      categories
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteActivity = /* GraphQL */ `
  subscription OnDeleteActivity($owner: String!) {
    onDeleteActivity(owner: $owner) {
      id
      activityID
      title
      description
      timeStart
      duration
      categories
      createdAt
      updatedAt
      owner
    }
  }
`;
