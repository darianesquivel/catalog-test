import React from "react";
import { Container, Typography, Toolbar, IconButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import CustomTabs from "../../components/CustomTabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DetailTable from "../../components/DetailTable";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexFlow: "column",
    padding: 5,
    paddingLeft: 8,
    gap: 22,
    lineHeight: "20px",
    height: "100%",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gap: 12,
  },
  image: {
    width: "100%",
  },
  description: {
    padding: 2,
    lineHeight: "18px",
  },
  accordion: {
    // border: "solid 1px black",
  },
  titleSection: {},
  headerButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  currentButton: {
    // borderBottom: "2px solid #6A5DF9",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

export default function SummaryDetails({
  name,
  image,
  description,
  closeModal,
}: any) {
  const classes = useStyles();
  const metadataContent = [
    { key: "Title", value: name },
    { key: "Image", value: image },
    { key: "Description", value: description },
  ];
  const tabs = [
    {
      columnName: "Metadata",
      content: <DetailTable rows={metadataContent} />,
    },
    {
      columnName: "Enrichment",
      content: null,
      disabled: true,
    },
    {
      columnName: "Assistant",
      content: null,
      disabled: true,
    },
  ];

  return (
    <Container className={classes.container}>
      <Toolbar className={classes.toolbar} disableGutters>
        <IconButton onClick={() => closeModal()}>
          <FontAwesomeIcon
            icon={faAngleRight}
            size="sm"
            width="20px"
            fontWeight="bold"
          />
        </IconButton>
        <Typography variant="h6" noWrap>
          Catalogs Explorer
        </Typography>
      </Toolbar>
      <div className={classes.header}>
        <div>
          <img src={image} className={classes.image} alt="main url" />
        </div>
        <div className={classes.titleSection}>
          <Typography variant="body1">Title</Typography>
          <span>{name}</span>
          <Typography variant="body1">Brand</Typography>
          <span> Default</span>
        </div>
      </div>
      <div className={classes.description}>
        <Typography>Description</Typography>
        <p>{description}</p>
      </div>
      {/* below could be a children */}

      <CustomTabs tabValues={tabs} />
    </Container>
  );
}
