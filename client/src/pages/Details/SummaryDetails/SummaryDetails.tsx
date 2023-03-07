import { Container, Typography, Toolbar, IconButton } from "@material-ui/core";
import CustomTabs from "../../../components/CustomTabs/CustomTabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DetailTable from "../../../components/DetailTable/DetailTable";

// STYLES
import useStyles from "./styles";

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
      content: <DetailTable rows={metadataContent} boldKeys />,
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
          <div>
            <Typography variant="body2">Title</Typography>
            <Typography className={classes.title} variant="caption">
              {name}
            </Typography>
          </div>

          <div>
            <Typography variant="body2">Brand</Typography>
            <Typography className={classes.brand} variant="caption">
              Default
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.description}>
        <Typography variant="body2">Description</Typography>
        <Typography variant="caption">{description}</Typography>
      </div>
      <CustomTabs tabValues={tabs} />
    </Container>
  );
}
